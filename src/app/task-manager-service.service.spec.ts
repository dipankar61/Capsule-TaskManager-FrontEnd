import { TestBed } from '@angular/core/testing';

import { TaskManagerServiceService } from './task-manager-service.service';

describe('TaskManagerServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskManagerServiceService = TestBed.get(TaskManagerServiceService);
    expect(service).toBeTruthy();
  });
});
