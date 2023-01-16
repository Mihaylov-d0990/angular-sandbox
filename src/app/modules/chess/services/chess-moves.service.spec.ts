import { TestBed } from '@angular/core/testing';

import { ChessMovesService } from './chess-moves.service';

describe('ChessMovesService', () => {
  let service: ChessMovesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessMovesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
