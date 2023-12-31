import BigGnb from '../../shared/BigGnb';
import LnbRight from '../../shared/LnbRight';
import { useImagination } from '../hooks/useImagination';
import { SampleButtton } from './button/button';
import { SizeButton } from './button/button';

const Imagination = () => {
  const {
    imageUrls,
    setPrompt,
    setNegative,
    buttonDisabled,
    negative,
    buttonBg,
    imgSrc,
    buttonText,
    generateImage,
    handleButtonClick,
    handleNumberClick,
    rotationState,
    settingOption,
    selectedsamples,
    isLoading,
    setButtonDisabled,
    handleSizeClick,
    buttonList,
    selectedSize,
    sizeList,
    currentPrompt,
  } = useImagination();

  return (
    <div>
      <BigGnb />
      <div className="imagination-lnb">
        <LnbRight />
      </div>
      <div className="imagination-main">
        <form onSubmit={generateImage} className="imagination-form">
          <div>
            <div className="prompt">
              <h1>Prompt</h1>
              <textarea
                id="prompt"
                className="prompt-input"
                onChange={(e) => {
                  setPrompt(e.target.value);
                }}
                placeholder="ex. A cute cat in a house"
                cols={15}
                rows={3}
                required
              ></textarea>
            </div>
            <div className="negative">
              <h1>Negative Propmt</h1>
              <textarea
                id="native"
                className="prompt-input"
                onChange={(e) => {
                  setNegative(e.target.value);
                }}
                placeholder="ex. scary, dirty"
                cols={15}
                rows={3}
                value={negative}
              ></textarea>
            </div>
          </div>
          <div className="prompt-setting">
            <h3 onClick={handleButtonClick}>Setting</h3>
            <img
              src="imagination/expand_less.png"
              alt=""
              onClick={handleButtonClick}
              className="prompt-setting-sample"
              style={{ transform: rotationState }}
            />
            <hr />
            <div>
              <span>
                Number of Images <b>{selectedsamples}</b>
              </span>
              &nbsp;
              <span>
                Image Dimensions{' '}
                <b>
                  {selectedSize[0] * 2}X{selectedSize[1] * 2}
                </b>
              </span>
            </div>
          </div>
          <div className="settings-options" style={{ display: settingOption }}>
            <p>Number of Images</p>
            {buttonList.map((_, idx) => (
              <SampleButtton
                key={idx}
                value={idx + 1}
                onClick={handleNumberClick}
                selected={selectedsamples === idx + 1}
                disabled={isLoading}
              />
            ))}
            <div className="settings-options-02">
              <p>Image Dimensions</p>
              {sizeList.map((size, idx) => (
                <SizeButton
                  key={idx}
                  size={size}
                  onClick={() => handleSizeClick(size)}
                  selectedSize={selectedSize}
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>
          <div className="img-Generate">
            <button
              type="submit"
              className="generate-btn-active"
              disabled={buttonDisabled}
              onClick={() => setButtonDisabled(isLoading)}
              style={{ background: buttonBg }}
            >
              <img src={imgSrc} alt="image" />
              <p>{buttonText}</p>
            </button>
          </div>
          <div className="image-history">
            <h2>Image Generation History</h2>
          </div>
          <div className="Generated-imgs">
            {isLoading && (
              <div className="loading-images">
                <h4>{new Date().toLocaleDateString()}</h4>
                <textarea
                  readOnly
                  value={currentPrompt}
                  className="prompt-input"
                />
                <div className="loading-imgs-row">
                  {Array(selectedsamples)
                    .fill(null)
                    .map((_, idx) => (
                      <div className="loading-img" key={idx}>
                        <img
                          src="imagination/funder-the-sea-octopus.gif"
                          alt="Loading"
                          className="loading-img"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {imageUrls.map((imageUrl, index) => (
              <div key={index}>
                <h4>{new Date(imageUrl.date).toLocaleDateString()}</h4>
                <textarea
                  readOnly
                  value={imageUrl.prompt}
                  className="prompt-input"
                />
                <div className="images-row">
                  {imageUrl.images.map((image, idx) => (
                    <div className="Generated-img" key={idx}>
                      <img src={image} alt="Generated" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Imagination;
