import {FC, ReactNode} from "react";
import {cn} from "../../../utils/style";
import s from "./Card.module.scss";

interface CardProps {
    children: ReactNode;
}


const Card: FC<CardProps> = ({ children }) => {
    return (
        <div className={cn(s.cardWrapper)}>
            <div className={cn(s.cardCover)}>
                123
            </div>
            <div className={cn(s.cardContent)}>
                1231
            </div>
        </div>
    )
}

export default Card;