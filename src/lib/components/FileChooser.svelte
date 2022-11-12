
<!-- mostly copied + adjusted from example here: https://svelte.dev/tutorial/select-bindings -->
<script>

    // for now, let's just hard-code the options and all

    const image1Text = `Welsh Corgy`;
    const image2Text = `Beagle`;
    const image3Text = `Bernese Mountain Dog`;
    const toolTipTextSuffix = ` - isn't it a cute one?`;

    import image1 from '../../assets/dogImage1.jpg'
    import image2 from '../../assets/dogImage2.jpg'
    import image3 from '../../assets/dogImage3.jpg'

	const imageOptions = [
		{ id: "image1", text: image1Text },
		{ id: "image2", text: image2Text },
		{ id: "image3", text: image3Text }
	];

    const chosenImageIdToImageData = {
        "image1": {
            image: image1,
            text: image1Text
        },
        "image2": {
            image: image2,
            text: image2Text
        },
        "image3": {
            image: image3,
            text: image3Text
        }
    };

	let selected;
	let imageToDisplay = image1;
	let imageToDisplayAltText = image1Text;
	let imageToDisplayToolTip = image1Text + toolTipTextSuffix;

	function handleSubmit() {
		console.debug(`Selected image with ID '${selected.id}'`);
		let imageData = chosenImageIdToImageData[selected.id];
		imageToDisplay = imageData.image;
		imageToDisplayAltText = imageData.text;
		imageToDisplayToolTip = imageData.text + toolTipTextSuffix;
		console.debug(`The selected option is ${imageToDisplay? "truthy" : "falsy"}`);
	}
</script>

<h2>Choose a picture</h2>

<form on:submit|preventDefault={handleSubmit}>
	<select id="imageSelect" bind:value={selected} >
		{#each imageOptions as imageOption}
			<option value={imageOption}>
				{imageOption.text}
			</option>
		{/each}
	</select>

	<button id="sumbitSelection" type=submit>
		Submit
	</button>
</form>

<!-- Alternatively, could try start with an empty selection and CSS attribute "display: none;" or something -->
<img id="imageDisplay" alt="{imageToDisplayAltText}" title="{imageToDisplayToolTip}" src="{imageToDisplay}" />

<style>
	input {
		display: block;
		width: 500px;
		max-width: 100%;
	}
	img {
	    height: 500px;
	}
</style>