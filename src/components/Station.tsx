import { Station } from "../utils/types";


export const AutoCompleteStation = (props: Station) => {
    const value: string = props.name + " (" + props.city + ", " + props.region + ")";
    return (
        <option value={value} />
    )



}
