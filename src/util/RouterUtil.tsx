import { RouteComponentProps } from "react-router-dom";

export interface MatchParams {
    name: string;
}

export interface MatchProps extends RouteComponentProps<MatchParams> {}