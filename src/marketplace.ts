import {SaleCreated as SaleCreatedEvent} from "../generated/Shop/Marketplace";
import {SaleSuccessful as SaleSuccessfulEvent} from "../generated/Shop/Marketplace";
import {SaleCancelled as SaleCancelledEvent} from "../generated/Shop/Marketplace";
import {BuySuccessful as BuySuccessfulEvent} from "../generated/Shop/Marketplace";
import {fetchAccount} from "@openzeppelin/subgraphs/src/fetch/account";
import {fetchERC721} from "@openzeppelin/subgraphs/src/fetch/erc721";

import {events, transactions} from "@amxx/graphprotocol-utils";

export function handleSaleCreated(event: SaleCreatedEvent): void {
	let contract = fetchERC721(event.address);
	let seller = fetchAccount(event.params._seller);
	//contract.owner = owner.id;
	//contract.save();
	//let ev = new OwnershipTransferred(events.id(event));
	//ev.emitter = contract.id;
	//ev.transaction = transactions.log(event).id;
	//ev.timestamp = event.block.timestamp;
	//ev.contract = contract.id;
	//ev.owner = owner.id;
	//ev.save();
}

export function handleSaleSuccessfull(event: SaleSuccessfulEvent): void {
	let contract = fetchERC721(event.address);
	//let owner = fetchAccount(event.params.newOwner);
	//contract.owner = owner.id;
	//contract.save();
	//let ev = new OwnershipTransferred(events.id(event));
	//ev.emitter = contract.id;
	//ev.transaction = transactions.log(event).id;
	//ev.timestamp = event.block.timestamp;
	//ev.contract = contract.id;
	//ev.owner = owner.id;
	//ev.save();
}

export function handleBuySuccessfull(event: BuySuccessfulEvent): void {
	let contract = fetchERC721(event.address);
	let owner = fetchAccount(event.params._buyer);
	//contract.owner = owner.id;
	//contract.save();
	//let ev = new OwnershipTransferred(events.id(event));
	//ev.emitter = contract.id;
	//ev.transaction = transactions.log(event).id;
	//ev.timestamp = event.block.timestamp;
	//ev.contract = contract.id;
	//ev.owner = owner.id;
	//ev.save();
}

export function handleSaleCancelled(event: SaleCancelledEvent): void {
	//let contract = fetchOwnable(event.address);
	//let owner = fetchAccount(event.params.newOwner);
	//contract.owner = owner.id;
	//contract.save();
	//let ev = new OwnershipTransferred(events.id(event));
	//ev.emitter = contract.id;
	//ev.transaction = transactions.log(event).id;
	//ev.timestamp = event.block.timestamp;
	//ev.contract = contract.id;
	//ev.owner = owner.id;
	//ev.save();
}
