import { ErrorModuleModule } from './error-module.module';

describe('ErrorModuleModule', () => {
  let errorModuleModule: ErrorModuleModule;

  beforeEach(() => {
    errorModuleModule = new ErrorModuleModule();
  });

  it('should create an instance', () => {
    expect(errorModuleModule).toBeTruthy();
  });
});
