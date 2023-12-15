import {
    InputWithLabel,
    RadioButton,
    ScrollDown,
    Date,
    NumberInput,
    CascaderScroll,
    Image,
} from "./form/form";
import "../css/form.css";
import * as Enum from "../constants/enum";

/**
 * 
 * @param {string} title title of the modal 
 * @param {object} data data to be used in the modal 
 * @param {FormData} form form data to be used in the modal
 * @param {Function} handleSearch function to be called when the value of the input changes
 *  
 * @returns {JSX.Element} a modal
 */
function createModal(title, data, form, handleSearch) {
    switch (title) {
        case Enum.titlePublication:
            return publicationModal(form, data, handleSearch);
        case Enum.titleGame:
            return gameModal(form, data, handleSearch);
        case Enum.titlePlatform:
            return platformModal(form);
        case Enum.titleUser:
            return userModal(form);
        case Enum.titleCategory:
            return categoryModal(form, data, handleSearch);
        case Enum.titleVideoGame:
            return videoGameModal(form);
        case Enum.titleGenre:
            return genreModal(form);
    }
}

/**
 * 
 * @param {FormData} userForm form data to be used in the modal
 *  
 * @returns {JSX.Element} a modal 
 */
function userModal(userForm) {
    return (
        <div className="divModal">
            <InputWithLabel
                label="Username"
                required={true}
                input={{
                    type: "text",
                    id: "username",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Username"
                onChange={(e) => {
                    userForm.set("username", e.target.value);
                }}
            />
            <InputWithLabel
                label="Email"
                required={true}
                input={{
                    type: "text",
                    id: "email",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Email"
                onChange={(e) => {
                    userForm.set("email", e.target.value);
                }}
            />
            <InputWithLabel
                label="Password"
                required={true}
                input={{
                    type: "password",
                    id: "password",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Password"
                onChange={(e) => {
                    userForm.set("password", e.target.value);
                }}
            />
            <InputWithLabel
                label="Firstname"
                input={{
                    type: "text",
                    id: "firstname",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Firstname"
                onChange={(e) => {
                    userForm.set("firstname", e.target.value);
                }}
            />
            <InputWithLabel
                label="Lastname"
                input={{
                    type: "text",
                    id: "lastname",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Lastname"
                onChange={(e) => {
                    userForm.set("lastname", e.target.value);
                }}
            />
            <RadioButton
                label="Is admin"
                choices={{ 1: "User", 2: "Admin" }}
                onChange={(value) => {
                    userForm.set("is_admin", value.target.value === "2");
                }}
            />
        </div>
    );
}


/**
 * 
 * @param {FormData} gameForm form data to be used in the modal
 * @param {object} data data to be used in the modal
 * @param {Array} data.user data to be used in the modal
 * @param {Array} data.publication data to be used in the modal
 * @param {Function} handleSearch function to be called when the value of the input changes
 * 
 * @returns {JSX.Element} a modal
 */
function gameModal(gameForm, data, handleSearch) {
    const { user, publication } = data;
    return (
        <div>
            <ScrollDown
                label="select a username"
                required={true}
                values={user}
                handleChange={(value) => {
                    gameForm.set("user_id", value);
                }}
                placeholder="select a username"
                options={{
                    label: "username",
                    value: "id",
                }}
                search={(e) => {
                    handleSearch(e.target.value, Enum.titleUser);
                }}
            />

            <CascaderScroll
                label="select a publication"
                required={true}
                onChange={(value) => {
                    gameForm.set("publication_id", value?.[1]);
                }}
                placeholder="select a publication"
                options={publication}
                search={(e) => {
                    handleSearch(e.target.value, Enum.titlePublication);
                }}
            />
            <RadioButton
                label="Is owned"
                choices={{ 1: "owned", 2: "not owned" }}
                onChange={(value) => {
                    gameForm.set("is_owned", value.target.value === "1");
                }}
            />
            <Date
                label="Release date"
                onChange={(value) => {
                    gameForm.set(
                        "release_date",
                        value
                            ? `${value.$y}-${value.$M}-${value.$D}`
                            : undefined
                    );
                }}
            />
            <NumberInput
                label="Review rating"
                onChange={(review_rating) => {
                    gameForm.set("review_rating", review_rating);
                }}
                min={0}
                max={5}
                placeHolder="Rating"
            />
            <InputWithLabel
                label="Review comment"
                input={{
                    type: "text",
                    id: "review_comment",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Review comment"
                onChange={(e) => {
                    gameForm.set("review_comment", e.target.value);
                }}
            />
        </div>
    );
}

/**
 * 
 * @param {FormData} publicationForm form data to be used in the modal
 * @param {object} data data to be used in the modal
 * @param {Array} data.videoGame data to be used in the modal
 * @param {Array} data.platform data to be used in the modal
 * @param {Function} handleSearch function to be called when the value of the input changes
 * 
 * @returns {JSX.Element} a modal
 */
function publicationModal(publicationForm, data, handleSearch) {
    const { videoGame, platform } = data;
    return (
        <div>
            <ScrollDown
                label="select a platform"
                required={true}
                values={platform}
                handleChange={(value) => {
                    publicationForm.set("platform_code", value);
                }}
                placeholder="select a platform"
                options={{
                    label: "code",
                    value: "code",
                }}
            />
            <ScrollDown
                label="select a video game"
                required={true}
                values={videoGame}
                handleChange={(value) => {
                    publicationForm.set("video_game_id", value);
                }}
                placeholder="select a video game"
                options={{
                    label: "name",
                    value: "id",
                }}
                search={(e) => {
                    handleSearch(e.target.value, Enum.titleVideoGame);
                }}
            />

            <Date
                label="Release date"
                onChange={(value) => {
                    publicationForm.set(
                        "release_date",
                        value
                            ? `${value.$y}-${value.$M}-${value.$D}`
                            : undefined
                    );
                }}
            />
            <NumberInput
                label="Release price"
                onChange={(release_price) =>
                    publicationForm.set("release_price", release_price)
                }
                min={0}
                max={100}
                placeHolder="Price"
                step={0.01}
            />
            <InputWithLabel
                label="Store page url"
                input={{
                    type: "url",
                    id: "store_page_url",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Store page url"
                onChange={(e) => {
                    publicationForm.set("store_page_url", e.target.value);
                }}
            />
        </div>
    );
}

/**
 * 
 * @param {FormData} platformForm form data to be used in the modal
 * 
 * @returns {JSX.Element} a modal
 */	
function platformModal(platformForm) {
    return (
        <div>
            <InputWithLabel
                label="Code"
                required={true}
                input={{
                    type: "text",
                    id: "code",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Code"
                onChange={(e) => {
                    platformForm.set("code", e.target.value);
                }}
            />
            <InputWithLabel
                label="Description"
                required={true}
                input={{
                    type: "text",
                    id: "description",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Description"
                onChange={(e) => {
                    platformForm.set("description", e.target.value);
                }}
            />
            <InputWithLabel
                label="Abbreviation"
                required={true}
                input={{
                    type: "text",
                    id: "abbreviation",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Abbreviation"
                onChange={(e) => {
                    platformForm.set("abbreviation", e.target.value);
                }}
            />
            <Image
                label="Image"
                required={true}
                onChange={(e) => platformForm.set("picture", e.target.files[0])}
            />
        </div>
    );
}

/**
 * 
 * @param {FormData} categoryForm form data to be used in the modal
 * @param {object} data data to be used in the modal
 * @param {Array} data.videoGame data to be used in the modal
 * @param {Array} data.genre data to be used in the modal
 * @param {Function} handleSearch function to be called when the value of the input changes
 * 
 * @returns {JSX.Element} a modal
 */
function categoryModal(categoryForm, data, handleSearch) {
    const { videoGame, genre } = data;
    return (
        <div>
            <ScrollDown
                label="select a video game"
                required={true}
                values={videoGame}
                handleChange={(value) => {
                    categoryForm.set("video_game_id", value);
                }}
                placeholder="select a video game"
                options={{
                    label: "name",
                    value: "id",
                }}
                search={(e) => {
                    handleSearch(e.target.value, Enum.titleVideoGame);
                }}
            />
            <ScrollDown
                label="select a genre"
                required={true}
                values={genre}
                handleChange={(value) => {
                    categoryForm.set("genre_id", value);
                }}
                placeholder="select a genre"
                options={{
                    label: "name",
                    value: "id",
                }}
                search={(e) => {
                    handleSearch(e.target.value, Enum.titleGenre);
                }}
            />
        </div>
    );
}

/**
 * 
 * @param {FormData} videoGameForm form data to be used in the modal
 * 
 * @returns {JSX.Element} a modal
 */
function videoGameModal(videoGameForm) {
    return (
        <div>
            <InputWithLabel
                label="Name"
                required={true}
                input={{
                    type: "text",
                    id: "name",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Name"
                onChange={(e) => {
                    videoGameForm.set("name", e.target.value);
                }}
            />
            <InputWithLabel
                label="Description"
                required={true}
                input={{
                    type: "text",
                    id: "description",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Description"
                onChange={(e) => {
                    videoGameForm.set("description", e.target.value);
                }}
            />
            <Image
                label="Image"
                required={true}
                onChange={(e) =>
                    videoGameForm.set("picture", e.target.files[0])
                }
            />
        </div>
    );
}

/**
 * 
 * @param {FormData} genreForm form data to be used in the modal
 * 
 * @returns {JSX.Element} a modal
 */
function genreModal(genreForm) {
    return (
        <div>
            <InputWithLabel
                label="Name"
                required={true}
                input={{
                    type: "text",
                    id: "name",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Name"
                onChange={(e) => {
                    genreForm.set("name", e.target.value);
                }}
            />
            <InputWithLabel
                label="Description"
                required={true}
                input={{
                    type: "text",
                    id: "description",
                }}
                className={{ label: "labelModal", input: "inputModal" }}
                placeholder="Description"
                onChange={(e) => {
                    genreForm.set("description", e.target.value);
                }}
            />
            <Image
                label="Image"
                required={true}
                onChange={(e) => genreForm.set("picture", e.target.files[0])}
            />
        </div>
    );
}

export default createModal;
