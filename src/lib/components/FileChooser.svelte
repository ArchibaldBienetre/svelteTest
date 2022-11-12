
<!-- mostly copied + adjusted from example here: https://svelte.dev/tutorial/select-bindings -->
<script>

    // for now, let's just hard-code the options and all

    import image1 from '../../assets/dogImage1.jpg'
    import image2 from '../../assets/dogImage2.jpg'
    import image3 from '../../assets/dogImage3.jpg'

    const chosenImageIdToImage = {
        "image1": image1,
        "image2": image2,
        "image3": image3
    };

	const imageOptions = [
		{ id: "image1", text: `Welsh Corgy` },
		{ id: "image2", text: `Beagle` },
		{ id: "image3", text: `Bernese Mountain Dog ` }
	];

	let selected;

	let chosenImageId = "image1";
	let imageToDisplay = image1;

	function handleSubmit() {
		console.info(`Selected image with ID '${selected.id}'`);
		imageToDisplay = chosenImageIdToImage[selected.id];
		console.info(`The selected option is ${imageToDisplay? "truthy" : "falsy"}`);
	}
</script>

<h2>Choose a picture</h2>

<form on:submit|preventDefault={handleSubmit}>
	<select bind:value={selected} on:change="{() => chosenImageId = ''}">
		{#each imageOptions as imageOption}
			<option value={imageOption}>
				{imageOption.text}
			</option>
		{/each}
	</select>

	<button type=submit>
		Submit
	</button>
</form>

<!-- Alternatively, could try start with an empty selection and CSS attribute display: none; or something -->
<img src="{imageToDisplay}" />

<style>
	input {
		display: block;
		width: 500px;
		max-width: 100%;
	}
	img {
	    width: 90%;
	}
</style>