import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { tick } from 'svelte';
import FileChooser from '../components/FileChooser.svelte';

describe('FileChooser.svelte', () => {
  afterEach(() => cleanup());

  it('mounts', () => {
    // act
    const { container } = render(FileChooser, {});

    // assert
    expect(container).toBeTruthy();

    const img = screen.getByRole('img');
    expect(img).toBeTruthy();
    expect(img.src).toBeTruthy();
    expect(img.alt).toEqual("Welsh Corgy");
    expect(img.title).toEqual("Welsh Corgy - isn't it a cute one?");

    const dropdown = screen.getByRole('combobox');
    expect(dropdown.value).toEqual('image1');
  })

  it('updates on select', async () => {
    // arrange
    const { container } = render(FileChooser, {});
    const btn = screen.getByText('Submit');
    const dropdown = screen.getByRole('combobox');

    // act
    fireEvent.change(dropdown, { target: { value: 'image2' } });
    await fireEvent.click(btn);

    // assert
     await waitFor(() => {
        expect(dropdown.value).toEqual('image2');
        const img = screen.getByRole('img');
        expect(img).toBeTruthy();
        expect(img.src).toBeTruthy();
        expect(img.alt).toEqual("Beagle");
        expect(img.title).toEqual("Beagle - isn't it a cute one?");
      }, {timeout: 2000});
  })
})