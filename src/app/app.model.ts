export interface ICheckin {
    id: number;
    key: string;
    links: {};
    fields: {};
    parentId: number;
    site: string;
    siteId: number;
    type: string;
  }
  export class CheckInModel implements ICheckin {
    /* istanbul ignore next */
    constructor(public id: number, public key: string, public links: {}, public fields: {},
        public parentId: number, public site: string, public siteId: number, public type: string) { }
  }
