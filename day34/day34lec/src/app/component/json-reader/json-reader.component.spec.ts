import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonReaderComponent } from './json-reader.component';

describe('JsonReaderComponent', () => {
  let component: JsonReaderComponent;
  let fixture: ComponentFixture<JsonReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsonReaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JsonReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
