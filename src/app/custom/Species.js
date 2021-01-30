import EventEmitter from "eventemitter3";

export default class Species extends EventEmitter {
  constructor() {
    super();
    this.name = null;
    this.classification = null;
  }

  static get events() {
    return { SPECIES_CREATED: "species_created" };
  }

  set nameset(name1) {
    this.name = name1;
  }
  set classificationset(classification) {
    this.classification = classification;
  }

   async init(url) {
    // first url must be
    // fetch data and set i guess ?
    const data = await (await fetch(url)).json();
    this.nameset = data.name;
    this.classificationset = data.classification;
    this.emit("SPECIES_CREATED",this);
    
  }
}
