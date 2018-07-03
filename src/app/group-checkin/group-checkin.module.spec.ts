import { GroupCheckinModule } from './group-checkin.module';

describe('GroupCheckinModule', () => {
  let groupCheckinModule: GroupCheckinModule;

  beforeEach(() => {
    groupCheckinModule = new GroupCheckinModule();
  });

  it('should create an instance', () => {
    expect(groupCheckinModule).toBeTruthy();
  });
});
