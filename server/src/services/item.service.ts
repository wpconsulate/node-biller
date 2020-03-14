import { Request, Response } from "express";

import { Pokemon } from "../models/pokemon";

export class ItemService {
	public welcomeMessage(req: Request, res: Response) {
		res.status(200).send("Welcome to Node Biller API");
	}

	public getAllPokemon(req: Request, res: Response) {
		Pokemon.find({}, (error: Error, pokemon: any) => {
			if (error) {
				res.send(error);
			}
			res.json(pokemon);
		});
	}

	public addNewPokemon(req: Request, res: Response) {
		const newPokemon = new Pokemon(req.body);
		newPokemon.save((error: Error, pokemon: any) => {
			if (error) {
				res.send(error);
			}
			res.json(pokemon);
		});
	}

	public deletePokemon(req: Request, res: Response) {
		const pokemonID = req.params.id;
		Pokemon.findByIdAndDelete(pokemonID, (error: Error, deleted: any) => {
			if (error) {
				res.send(error);
			}
			const message = deleted
				? "Deleted successfully"
				: "Pokemon not found :(";
			res.status(200).send(message);
		});
	}

	public updatePokemon(req: Request, res: Response) {
		const pokemonId = req.params.id;
		Pokemon.findByIdAndUpdate(
			pokemonId,
			req.body,
			(error: Error, pokemon: any) => {
				if (error) {
					res.send(error);
				}
				const message = pokemon
					? "Updated successfully"
					: "Pokemon not found :(";
				res.send(message);
			}
		);
	}
}
