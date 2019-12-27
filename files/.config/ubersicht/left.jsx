import getSpacesForDisplay from "./lib/getSpacesForDisplay";
import { css, run } from 'uebersicht';
import { defaultTheme } from "./lib/style";

export const initialState = {
    spaces: [],
};

export const updateState = (event, state) => {
  switch(event.type) {
      case 'SPACES_UPDATED':
        return {
            ...state,
            spaces: event.spaces,
        };
      default:
        return state;
  }
}

export const command = (dispatch) => {
    getSpacesForDisplay(1).then(spaces => dispatch({ type: 'SPACES_UPDATED', spaces }));
};

export const refreshFrequency = false;

export const className = `
    display: flex;
    justify-content: space-between;
    margin: 15px 20px;
    order: 1;
    position: static;
`;

const containerClass = css`
    ${defaultTheme}
    align-items: center;
    display: inline-flex;
    justify-content: space-between;
    vertical-align: top;
    margin: 0;
    margin-right: 10px;
    border-radius: unset;
`;

const spaceContainerClass = css`
    ${containerClass}
    padding: 0;

    div {
        padding: 0 2ch;
        cusor: pointer;
    }
`;

const spaceFocusedClass = css`
    font-weight: bold;
    box-shadow: inset 0px 0px 0px 1px #fff;
`;

export const render = ({ spaces }, dispatch) => {
    return (
        <div className={spaceContainerClass}>
            {spaces.map(space =>
                <div key={space.index} className={space.focused ? spaceFocusedClass : null} onClick={() => {
                    if (space.focused) {
                        return;
                    }

                    dispatch({
                        type: 'SPACES_UPDATED',
                        spaces: spaces.map(s => ({...s, focused: space.index === s.index})),
                    });

                    run(`yabai -m space --focus ${space.index}`);
                }}>
                    {space.label ? `${space.label} [${space.index}]` : space.index}
                </div>
            )}
        </div>
    );
};
