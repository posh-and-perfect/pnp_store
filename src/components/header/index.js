import PropTypes from "prop-types";
import HeaderLayout from "@components/header/layouts";
import DesktopHeader from "@components/header/desktop";
import NotificationBar from "@components/notification-bar";


const Header = ({navbarAlignment, logoAlignment, showNotificationBar, dark, containerFluid, logo, navData}) => {
    return (
        <HeaderLayout
            logo={logo}
            navData={navData}
            hoverStyleClass="tt-hover-03"
        >
            {showNotificationBar && <NotificationBar dark={false} containerFluid={containerFluid}/>}

            <DesktopHeader
                logo={logo}
                navData={navData}
                logoAlignment={logoAlignment}
                containerFluid={containerFluid}
                navbarAlignment={navbarAlignment}
            />
        </HeaderLayout>
    );
};

Header.defaultProps = {
    showNotificationBar: false
}

Header.propTypes = {
    navbarAlignment: PropTypes.string,
    logoAlignment: PropTypes.string,
    showNotificationBar: PropTypes.bool,
    dark: PropTypes.bool,
    containerFluid: PropTypes.bool,
    logo: PropTypes.string.isRequired,
    navData: PropTypes.array.isRequired,
}

export default Header;