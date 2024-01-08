import { ComponentFixture, TestBed } from "@angular/core/testing";
import { WelcomeComponent } from "./welcome.component";

describe('WelcomeComponent', () => {
	let component: WelcomeComponent;
	let fixture: ComponentFixture<WelcomeComponent>;
	  
	
	beforeEach(() => {
		fixture = TestBed.createComponent(WelcomeComponent);
		component = fixture.componentInstance;
	});
	
	it('should create the component', () => {
		expect(component).toBeTruthy();
	});
	
	it('should set the pageTitle', () => {
		expect(component.pageTitle).toEqual('Welcome');
	});
	
	  
	it('should render the component with the correct title', () => {
		fixture.detectChanges();
		expect(fixture.nativeElement.querySelector('.card-header').textContent).toContain('Welcome');
	});
});