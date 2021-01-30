import EventEmitter from "eventemitter3";
import Species from "./Species";

export default class StarWarsUniverse extends EventEmitter {
  constructor() {
    super();
    this._maxSpecies = 10;
    this.species = [];
  }

  static get events() {
    return {
      MAX_SPECIES_REACHED: "max_species_reached",
      SPECIES_CREATED: "species_created",
    };
  }

  get speciesCount() {
    return this.species.length;
  }

  createSpecies() {
    const speciesInstance = new Species();
    speciesInstance.on("SPECIES_CREATED", this._onSpeciesCreated, this);

    speciesInstance.init(
      `https://swapi.booost.bg/api/species/${this.speciesCount + 1}/`
    );
  }

  _onSpeciesCreated(instance) {
    this.species.push(instance);
    this.emit("SPECIES_CREATED", { speciesCount: this.speciesCount });
  }
}
