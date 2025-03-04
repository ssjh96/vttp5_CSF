import { TestBed } from '@angular/core/testing';

import { TaskSvcService } from './task-svc.service';

describe('TaskSvcService', () => {
  let service: TaskSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
