import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { userResolver } from './user.resolver';
import { User } from '../types/user';

describe('userResolver', () => {
  const executeResolver: ResolveFn<User | null> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => userResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
