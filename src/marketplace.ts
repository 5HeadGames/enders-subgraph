import {events, transactions} from "@amxx/graphprotocol-utils";
import {fetchAccount} from "@openzeppelin/subgraphs/src/fetch/account";
import {fetchERC721, fetchERC721Token} from "@openzeppelin/subgraphs/src/fetch/erc721";
import {fetchERC1155Token, fetchERC1155} from "@openzeppelin/subgraphs/src/fetch/erc1155";
import {Address, BigInt} from "@graphprotocol/graph-ts";
import {SaleCreated as SaleCreatedEvent} from "../generated/Shop/Marketplace";
import {SaleSuccessful as SaleSuccessfulEvent} from "../generated/Shop/Marketplace";
import {SaleCancelled as SaleCancelledEvent} from "../generated/Shop/Marketplace";
import {BuySuccessful as BuySuccessfulEvent} from "../generated/Shop/Marketplace";

import {Marketplace} from "../generated/Shop/Marketplace";
import {Buy, Sale} from "../generated/schema";

import {log} from "@graphprotocol/graph-ts";

function getSale(contractAdd: Address, saleId: BigInt, prefix: string): Sale {
	const erc721 = fetchERC721(contractAdd);
	const marketplace = Marketplace.bind(contractAdd);
	const id = prefix.concat("/").concat(saleId.toHex());
	let sale = Sale.load(id);

	if (sale == null) {
		const saleData = marketplace.try_sales(saleId);
		const identifier = saleData.value.value2;
		const erc1155 = fetchERC1155(saleData.value.value1);

		sale = new Sale(id);
		sale.seller = fetchAccount(saleData.value.value0).id;
		sale.nft = fetchERC1155Token(erc1155, identifier).id;
		sale.amount = saleData.value.value3;
		sale.price = saleData.value.value4;
		sale.duration = saleData.value.value5;
		sale.status = BigInt.fromI32(saleData.value.value7);
		if (erc721) sale.token = fetchERC721Token(erc721, saleId).id;
	}

	return sale;
}

export function handleSaleCreated(event: SaleCreatedEvent): void {
	const sale = getSale(event.address, event.params._auctionId, event.address.toHex());
	sale.transaction = transactions.log(event).id;
	sale.timestamp = event.block.timestamp;
	sale.emitter = event.address;
	sale.save();
}

export function handleSaleSuccessfull(event: SaleSuccessfulEvent): void {
	const sale = getSale(event.address, event.params._aucitonId, event.address.toHex());
	sale.status = BigInt.fromI32(1);
	sale.save();
}

export function handleBuySuccessfull(event: BuySuccessfulEvent): void {
	const sale = getSale(event.address, event.params._aucitonId, event.address.toHex());
	const buy = new Buy(event.transaction.hash.toHex().concat("/").concat(event.logIndex.toString()));
	buy.transaction = transactions.log(event).id;
	buy.timestamp = event.block.timestamp;
	buy.emitter = event.address;
	buy.sale = event.address.toHex().concat("/").concat(event.params._aucitonId.toHex());

	buy.buyer = fetchAccount(event.params._buyer).id;
	buy.amount = event.params._nftAmount;
	buy.cost = event.params._cost;

	buy.save();

	sale.amount = sale.amount.minus(buy.amount);
	sale.save();
}

export function handleSaleCancelled(event: SaleCancelledEvent): void {
	const sale = getSale(event.address, event.params._auctionId, event.address.toHex());
	sale.status = BigInt.fromI32(2);
	sale.save();
}
