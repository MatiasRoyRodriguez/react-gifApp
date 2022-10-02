import { render, screen } from '@testing-library/react';
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs');

describe('Prueba en el <GifGrid/>', () => {

	const category = 'One punch';

	test('Debe de mostrar el loading inicialmente', () => {

		useFetchGifs.mockReturnValue({
			images: [],
			isLoading: true
		});

		render(<GifGrid category={category} />);
		expect(screen.getByText('Cargando...'));
		expect(screen.getByText(category));

	});

	test('Debe de mostrar items cuando se cargan las imagenes mediante el useFetchGifs', () => {

		const gifs = [
			{
				id: 'ABC',
				title: 'Saitama',
				url: 'https://localhost/saitama.jpg'
			},
			{
				id: 'ABC123',
				title: 'Test',
				url: 'https://localhost/test.jpg'
			}
		]

		useFetchGifs.mockReturnValue({
			images: gifs,
			isLoading: true
		})

		render(<GifGrid category={category} />);

		expect(screen.getAllByRole('img').length).toBe(2);

	});

});