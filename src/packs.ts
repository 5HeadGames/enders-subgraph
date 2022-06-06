import {transactions} from "@amxx/graphprotocol-utils";
import {fetchAccount} from "@openzeppelin/subgraphs/src/fetch/account";
import {fetchERC1155Token, fetchERC1155} from "@openzeppelin/subgraphs/src/fetch/erc1155";
import {LootBoxOpened as LootBoxOpenedEvent} from "../generated/Pack/Packs";

import {Unpack} from "../generated/schema";

export function handleLootBoxOpened(event: LootBoxOpenedEvent): void {
	const id = event.transaction.hash.toHex().concat("/").concat(event.logIndex.toString());
	const opened = new Unpack(id);
	const erc1155 = fetchERC1155Token(fetchERC1155(event.address), event.params.optionId);

	if (erc1155) opened.pack = erc1155.id.toString();
	opened.user = fetchAccount(event.params.buyer).id;
	opened.received = event.params.itemsMinted;
	opened.transaction = transactions.log(event).id;
	opened.timestamp = event.block.timestamp;
	opened.emitter = event.address;
	opened.save();
}
