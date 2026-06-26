/**
 * Represents the normalized profile of an artwork inspected by DTF MASTER.
 *
 * This model is intentionally limited to data structure, serialization and
 * validation concerns. Image analysis and recommendation algorithms must be
 * implemented in engine services, not inside this model.
 */
export class ArtworkProfile {
  /**
   * Creates a new artwork profile using default values plus optional overrides.
   *
   * @param {Partial<ArtworkProfileData>} data Initial profile values.
   */
  constructor(data = {}) {
    this.reset();
    this.#assign(data);
  }

  /**
   * Converts the profile instance into a plain JSON-safe object.
   *
   * @returns {ArtworkProfileData}
   */
  toJSON() {
    return {
      fileName: this.fileName,
      width: this.width,
      height: this.height,
      dpi: this.dpi,
      colorMode: this.colorMode,
      bitDepth: this.bitDepth,
      hasTransparency: this.hasTransparency,
      transparencyPercentage: this.transparencyPercentage,
      totalPixels: this.totalPixels,
      opaquePixels: this.opaquePixels,
      semiTransparentPixels: this.semiTransparentPixels,
      transparentPixels: this.transparentPixels,
      profile: this.profile,
      aiGenerated: this.aiGenerated,
      logo: this.logo,
      photo: this.photo,
      illustration: this.illustration,
      vintage: this.vintage,
      textures: this.textures,
      gradients: this.gradients,
      glows: this.glows,
      smoke: this.smoke,
      tinyText: this.tinyText,
      thinLines: this.thinLines,
      detailLevel: this.detailLevel,
      printScore: this.printScore,
      recommendedLPI: this.recommendedLPI,
      recommendedWhiteExpansion: this.recommendedWhiteExpansion,
      recommendedTrap: this.recommendedTrap,
      recommendedSharpen: this.recommendedSharpen,
      notes: [...this.notes]
    };
  }

  /**
   * Creates an ArtworkProfile instance from plain JSON data.
   *
   * @param {Partial<ArtworkProfileData>} data Serialized artwork profile data.
   * @returns {ArtworkProfile}
   */
  static fromJSON(data = {}) {
    return new ArtworkProfile(data);
  }

  /**
   * Resets the profile to a known empty state.
   *
   * @returns {ArtworkProfile}
   */
  reset() {
    this.fileName = '';
    this.width = 0;
    this.height = 0;
    this.dpi = 0;
    this.colorMode = 'unknown';
    this.bitDepth = 0;
    this.hasTransparency = false;
    this.transparencyPercentage = 0;
    this.totalPixels = 0;
    this.opaquePixels = 0;
    this.semiTransparentPixels = 0;
    this.transparentPixels = 0;
    this.profile = 'unknown';
    this.aiGenerated = false;
    this.logo = false;
    this.photo = false;
    this.illustration = false;
    this.vintage = false;
    this.textures = false;
    this.gradients = false;
    this.glows = false;
    this.smoke = false;
    this.tinyText = false;
    this.thinLines = false;
    this.detailLevel = 'unknown';
    this.printScore = 0;
    this.recommendedLPI = 0;
    this.recommendedWhiteExpansion = 0;
    this.recommendedTrap = 0;
    this.recommendedSharpen = 0;
    this.notes = [];

    return this;
  }

  /**
   * Validates the structural integrity of the current profile values.
   *
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validate() {
    const errors = [];

    this.#validateNonNegativeNumber('width', errors);
    this.#validateNonNegativeNumber('height', errors);
    this.#validateNonNegativeNumber('dpi', errors);
    this.#validateNonNegativeNumber('bitDepth', errors);
    this.#validateNonNegativeNumber('transparencyPercentage', errors);
    this.#validateNonNegativeNumber('totalPixels', errors);
    this.#validateNonNegativeNumber('opaquePixels', errors);
    this.#validateNonNegativeNumber('semiTransparentPixels', errors);
    this.#validateNonNegativeNumber('transparentPixels', errors);
    this.#validateNonNegativeNumber('printScore', errors);
    this.#validateNonNegativeNumber('recommendedLPI', errors);
    this.#validateNonNegativeNumber('recommendedWhiteExpansion', errors);
    this.#validateNonNegativeNumber('recommendedTrap', errors);
    this.#validateNonNegativeNumber('recommendedSharpen', errors);

    if (this.transparencyPercentage > 100) {
      errors.push('transparencyPercentage must be less than or equal to 100.');
    }

    if (this.printScore > 100) {
      errors.push('printScore must be less than or equal to 100.');
    }

    if (!Array.isArray(this.notes)) {
      errors.push('notes must be an array.');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Assigns known data keys while preserving defaults for missing values.
   *
   * @param {Partial<ArtworkProfileData>} data Values to merge into the model.
   */
  #assign(data) {
    Object.entries(data).forEach(([key, value]) => {
      if (!Object.hasOwn(this, key)) return;
      this[key] = key === 'notes' && Array.isArray(value) ? [...value] : value;
    });
  }

  /**
   * Adds a validation error when a numeric field is invalid.
   *
   * @param {keyof ArtworkProfileData} field Field name to validate.
   * @param {string[]} errors Mutable validation error collection.
   */
  #validateNonNegativeNumber(field, errors) {
    const value = this[field];

    if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
      errors.push(field + ' must be a non-negative number.');
    }
  }
}

/**
 * @typedef {object} ArtworkProfileData
 * @property {string} fileName
 * @property {number} width
 * @property {number} height
 * @property {number} dpi
 * @property {string} colorMode
 * @property {number} bitDepth
 * @property {boolean} hasTransparency
 * @property {number} transparencyPercentage
 * @property {number} totalPixels
 * @property {number} opaquePixels
 * @property {number} semiTransparentPixels
 * @property {number} transparentPixels
 * @property {string} profile
 * @property {boolean} aiGenerated
 * @property {boolean} logo
 * @property {boolean} photo
 * @property {boolean} illustration
 * @property {boolean} vintage
 * @property {boolean} textures
 * @property {boolean} gradients
 * @property {boolean} glows
 * @property {boolean} smoke
 * @property {boolean} tinyText
 * @property {boolean} thinLines
 * @property {string} detailLevel
 * @property {number} printScore
 * @property {number} recommendedLPI
 * @property {number} recommendedWhiteExpansion
 * @property {number} recommendedTrap
 * @property {number} recommendedSharpen
 * @property {string[]} notes
 */
