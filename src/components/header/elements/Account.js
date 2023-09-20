import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import data from "@data/account-menu.json";

const Account = ({ className, isHidden, openHandler, closeHandler }) => {
  const { data: session, status } = useSession();

  let FName, LName;

  if (session && session.user) {
    const { name, email } = session.user;
    const nameParts = name.split(" ");
    FName = nameParts[0];
    LName = nameParts[nameParts.length - 1];
  }

  return (
    <div className={`tt-parent-box ${className}`}>
      <div className={`tt-account tt-dropdown-obj ${!isHidden ? "active" : null}`}>
        <button className="tt-dropdown-toggle" data-id="account" onClick={openHandler}>
          <i className="icon-f-94" />
        </button>
        <div className="tt-dropdown-menu">
          <div className="tt-mobile-add">
            <button className="tt-close" data-id="account" onClick={closeHandler}>
              Close
            </button>
          </div>
          <div className="tt-dropdown-inner">
            <ul>
              {status === "loading" ? (
                <li>Loading...</li>
              ) : session ? (
                <>
                  {session.user && (
                    <li>
                      {/* Display the user's first name */}
                      <span>Welcome, {FName}</span>
                    </li>
                  )}
                  {data.map((item) => {
                    if (item.text != "Sign In" && item.text != "Sign Up" && item.text != "Sign Out") {
                      return (
                        <li key={item.id}>
                          <Link href={item.link}>
                            <a>
                              <i className={item.iconClass} />
                              {item.text}
                            </a>
                          </Link>
                        </li>
                      );
                    }
                    if (item.text === "Sign Out") {
                      return (
                        <li key={item.id}>
                          <a onClick={() => signOut()}>
                            <i className={item.iconClass} />
                            {item.text}
                          </a>
                        </li>
                      );
                    }
                    return null;
                  })}
                </>
              ) : (
                data.map((item) => {
                  if (item.text != "Sign Out") {
                    return (
                      <li key={item.id}>
                        <Link href={item.link}>
                          <a>
                            <i className={item.iconClass} />
                            {item.text}
                          </a>
                        </Link>
                      </li>
                    );
                  }
                })  
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;