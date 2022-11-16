import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import FlyingLogo from '../components/FlyingLogo.svelte';
import { tick } from 'svelte';

describe('FlyingLogo.svelte', () => {
  afterEach(() => cleanup());

  it('mounts', () => {
    // act
    const { container } = render(FlyingLogo, {});

    // assert
    const logos = container.querySelectorAll("svg");
    expect(logos).toHaveLength(2);
  })

  it('hides if visibility is toggled', async () => {
    // arrange
    const { container } = render(FlyingLogo, {});
    const visibilityCheckboxes = screen.queryAllByRole('checkbox');
    expect(visibilityCheckboxes[0].checked).toBeTruthy();

    // act
    await fireEvent.click(visibilityCheckboxes[0]);
    expect(visibilityCheckboxes[0].checked).toBeFalsy();
    await tick();

    // assert
    await waitFor(() => {
      const logos = container.querySelectorAll("svg");
      expect(logos).toHaveLength(0);
    }, { timeout: 10_000 });
  }, 60_000)

})