import {Flat} from '../../../flat-filter/entity/Flat';

export class RequestsForUserVerification {
  id?: number;
  status: string;
  creationDate: Date;
  verificationDate: Date;
  flat: Flat;
}
