import PropTypes from "prop-types";
import Logo from "@components/logo";
import Navbar from "@components/navbar";
import {Container} from "react-bootstrap";
import HeaderAction from "@components/header/action/HeaderAction";

const DesktopHeader = ({navbarAlignment, logoAlignment, containerFluid, logo, navData}) => {
    return (
        <div className="tt-desktop-header">
            <Container fluid={containerFluid}>
                <div className="tt-header-holder">
                    <div className={`tt-obj-logo obj-alignment-${logoAlignment ? logoAlignment : 'left'}`}>
                        <Logo src={logo} width={150} height={50}/>
                    </div>

                    <div className="tt-obj-options obj-move-right tt-position-absolute">
                        <HeaderAction
                            className="obj-move-right"
                            search={true}
                            cart={true}
                            account={true}
                            settings={true}
                        />
                    </div>

                    <div className={`tt-obj-menu obj-alignment-${navbarAlignment ? navbarAlignment : 'center'}`}>
                        <Navbar
                            navData={navData}
                            hoverStyleClass="tt-hover-03 tt-menu-small"
                        />
                    </div>
                    
                </div>
            </Container>
        </div>
    );
};

DesktopHeader.propTypes = {
    navbarAlignment: PropTypes.string,
    logoAlignment: PropTypes.string,
    containerFluid: PropTypes.bool,
    logo: PropTypes.string.isRequired,
    navData: PropTypes.array.isRequired,
}

export default DesktopHeader;