import { GameResponsiveListItemRenderer } from "$lib/parsers/items/gameResponsiveListItemRenderer";
import { GameTwoRowItemRenderer } from "$lib/parsers/items/GameTwoRowItemRenderer";
import type { CarouselHeader, GameCover } from "$lib/types";
import type { ICarouselTwoRowItem } from "$lib/types/gameListItemRenderer";
import type { IListItemRenderer } from "$lib/types/gameListItemRenderer";
import { iter } from "$lib/utils/compilation";

export interface ITitlePageHeader {
    name: string;
    covers: cover[];
    buttons: {
        shuffle?: { params?: string; 
        }
    }
}