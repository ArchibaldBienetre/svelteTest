import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
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

    const dropdowns = screen.getAllByRole('combobox');
    const imageSelect = dropdowns[0];
    expect(imageSelect.value).toEqual('image1');
  })

  it('updates on image select', async () => {
    // arrange
    const { container } = render(FileChooser, {});
    const btn = screen.getByText('Submit');
    const dropdowns = screen.getAllByRole('combobox');
    const imageSelect = dropdowns[0];

    // act
    fireEvent.change(imageSelect, { target: { value: 'image2' } });
    await fireEvent.click(btn);

    // assert
    await waitFor(() => {
      expect(imageSelect.value).toEqual('image2');
      const img = screen.getByRole('img');
      expect(img).toBeTruthy();
      expect(img.src).toBeTruthy();
      expect(img.alt).toEqual("Beagle");
      expect(img.title).toEqual("Beagle - isn't it a cute one?");
    }, { timeout: 2000 });
  })

  it('updates on transition select', async () => {
    // arrange
    const { container } = render(FileChooser, {});
    const btn = screen.getByText('Submit');
    const dropdowns = screen.getAllByRole('combobox');
    const imageSelect = dropdowns[0];
    const transitionSelect = dropdowns[1];

    // act
    fireEvent.change(imageSelect, { target: { value: 'image2' } });
    fireEvent.change(transitionSelect, { target: { value: 'fly' } });
    await fireEvent.click(btn);

    // assert
    await waitFor(() => {
      expect(imageSelect.value).toEqual('image2');
      const img = screen.getByRole('img');
      expect(img).toBeTruthy();
      expect(img.src).toBeTruthy();
      expect(img.alt).toEqual("Beagle");
      expect(img.title).toEqual("Beagle - isn't it a cute one?");
    }, { timeout: 2000 });
  })
})