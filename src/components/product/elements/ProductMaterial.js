import Tooltip from "@components/ui/tooltip";
import PropTypes from "prop-types";

const ProductMaterial = ({ product, productColor, productMaterial, productMaterialHandler, className }) => {

    const { material } = product;

    return (
        <ul className={`tt-options-swatch material-switch ${className ? className : ''}`}>
            <Tooltip content={material.name}>
                <li className={material.slug === material ? "active" : ""}>
                    <a href="/"
                        className="options-color-img"
                        data-materialname={material.slug}
                        style={{ backgroundImage: `url(${material.thumb})` }}
                        onClick={(event => productMaterialHandler(event))}
                    />
                </li>
            </Tooltip>
        </ul>
    );
};

ProductMaterial.propTypes = {
    product: PropTypes.object.isRequired,
    productColor: PropTypes.string.isRequired,
    productMaterial: PropTypes.string.isRequired,
    productMaterialHandler: PropTypes.func.isRequired,
    className: PropTypes.string
};

export default ProductMaterial;