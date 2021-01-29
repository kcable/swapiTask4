
import EventEmitter from "eventemitter3";
import Species from "./Species";

export default class StarWarsUniverse extends EventEmitter {  
    constructor(){
        super();
       this._maxSpecies = 10;
       this.species = [];
    }

     static get events(){
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
           this._onSpeciesCreated(speciesInstance);
           // i guess check ?
           if(this.speciesCount == this._maxSpecies){
                this.emit("MAX_SPECIES_REACHED");
           } else {await this.createSpecies();}
           
       })
      
      await speciesInstance.init(`https://swapi.dev/api/species/${this.speciesCount + 1}/`);
      speciesInstance.removeAllListeners();
     
    }

    
}