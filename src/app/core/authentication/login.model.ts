export interface ILinkModel {
  rel: string; href: string; operations: string[]; linkedEntities: IAPIModel[]; linkedEntityServerSide: IAPIModel[];
}
export class LinkModel implements ILinkModel {
  /* istanbul ignore next */
  constructor(public rel: string, public href: string, public operations: string[], public linkedEntities: IAPIModel[],
    public linkedEntityServerSide: IAPIModel[]) {}
}
export interface IFieldModel {
id: number; field: string; instance: number; value: any; override: number;
}
export class FieldModel implements IFieldModel {
  /* istanbul ignore next */
  constructor(public id: number, public field: string, public instance: number,
     public value: any, public override: number) {}
}
export class UserDataModel {
  active: FieldModel;
  firstName: FieldModel;
  lastName: FieldModel;
  userName: FieldModel;
  userDescription: FieldModel;
}
export interface IAPIModel {
  id: number; key: string; site: string; fields: UserDataModel; links: LinkModel[];
}
export interface ILoginToken {
  token: string; user: IAPIModel; expiration: Date; minutesValid: number;
}
export class LoginToken implements ILoginToken {
  /* istanbul ignore next */
  constructor(public token: string, public user: IAPIModel, public expiration: Date, public minutesValid: number) {}
}

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
  site: string;
}
export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
}
