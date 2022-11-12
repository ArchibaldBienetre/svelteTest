import { cleanup, fireEvent, render, screen } from '@testing-library/svelte'
import FileChooser from '../components/FileChooser.svelte'

describe('FileChooser.svelte', () => {
  afterEach(() => cleanup());

  it('mounts', () => {
    const { container } = render(FileChooser, {});

    expect(container).toBeTruthy();
    const img = screen.getByRole('img');
    expect(img).toBeTruthy();
    expect(img.src).toBeTruthy();
    expect(img.alt).toEqual("Welsh Corgy");
    expect(img.title).toEqual("Welsh Corgy - isn't it a cute one?");
  })

})