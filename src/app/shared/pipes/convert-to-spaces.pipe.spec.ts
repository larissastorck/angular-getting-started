import { ConvertToSpacesPipe } from "./covert-to-spaces.pipe";

describe('ConvertToSpacesPipe', () => {

	it('should convert # to space', () => {
		//arrange
		let pipe = new ConvertToSpacesPipe()

		//act
		const result = pipe.transform('abc#123', '#')
		//assert
		expect(result).toBe('abc 123')
	})

	it('should convert - to space', () => {
		//arrange
		let pipe = new ConvertToSpacesPipe()
		//act
		const result = pipe.transform('i-need-space', '-')
		//assert
		expect(result).toBe('i need space')
	});
})