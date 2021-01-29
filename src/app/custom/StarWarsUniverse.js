
import EventEmitter from "eventemitter3";
import Application from "../Application";
import Species from "./Species";

export default class StarWarsUniverse extends EventEmitter {  
    constructor(){
        super();
       this._maxSpecies = 10;
       this.species = [];
    }

     get events(){
        return {MAX_SPECIES_REACHED:'max_species_reached',SPECIES_CREATED:"species_created"};
    }

     get speciesCount(){
      
        return this.species.length;
    }

    _onSpeciesCreated(instance){
             this.species.push(instance);
             this.emit("SPECIES_CREATED",{speciesCount:this.speciesCount})
    }

     async createSpecies(){
       
       const speciesInstance = new Species();
       speciesInstance.on("SPECIES_CREATED",async (arg)=>{
           console.log("listener called");
           this._onSpeciesCreated(speciesInstance);
           // i guess check ?
           if(this.speciesCount == this._maxSpecies){
                this.emit("MAX_SPECIES_REACHED");
           } else {await this.createSpecies();}
           
       })
      
      await speciesInstance.init(`https://swapi.booost.bg/api/species/${this.speciesCount + 1}/`);
    }

    
}