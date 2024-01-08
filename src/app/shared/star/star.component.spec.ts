import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarComponent } from './star.component';
  

describe('StarComponent', () => {
	let component: StarComponent;
	let fixture: ComponentFixture<StarComponent>;
  
	beforeEach(() => {
		fixture = TestBed.createComponent(StarComponent);
		component = fixture.componentInstance;
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});
	
	it('should set the default values correctly', () => {
		expect(component.rating).toEqual(0);
		expect(component.cropWidth).toEqual(75);
	});


	it('should update cropWidth on ngOnChanges', () => {
		component.rating = 3;
		component.ngOnChanges({ rating: { currentValue: 3, previousValue: 0, isFirstChange: () => false, firstChange: false } });
		expect(component.cropWidth).toEqual(45); // (3 * 75) / 5
	});
	
	it('should emit ratingClicked event on onClick', () => {
		const spy = spyOn(component.ratingClicked, 'emit');
		component.onClick();
		expect(spy).toHaveBeenCalledWith('The rating 0 was clicked');
	});

});