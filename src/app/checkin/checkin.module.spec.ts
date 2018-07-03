import { CheckinModule } from './checkin.module';

describe('CheckinModule', () => {
  let checkinModule: CheckinModule;

  beforeEach(() => {
    checkinModule = new CheckinModule();
  });

  it('should create an instance', () => {
    expect(checkinModule).toBeTruthy();
  });
});
