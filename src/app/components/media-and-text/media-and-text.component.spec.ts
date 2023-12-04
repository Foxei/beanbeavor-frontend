import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaAndTextComponent } from './media-and-text.component';

describe('MediaAndTextComponent', () => {
  let component: MediaAndTextComponent;
  let fixture: ComponentFixture<MediaAndTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaAndTextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaAndTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
