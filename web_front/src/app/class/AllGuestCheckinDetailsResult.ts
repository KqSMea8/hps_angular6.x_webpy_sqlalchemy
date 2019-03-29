import { CheckinInfo } from '../class/checkinInfo';
import { GuestCheckinInfo } from '../class/guestCheckinInfo';
import { GuestDocInfo } from '../class/guestDocInfo';
import { ForeignerInfo } from '../class/foreignerInfo';

export class AllGuestCheckinDetailsResult {
    CheckinInfo: CheckinInfo = new CheckinInfo();
    GuestInfo: Array<GuestInfo>;
}

class GuestInfo {
    GuestCheckIn: GuestCheckinInfo = new GuestCheckinInfo();
    GuestDoc: GuestDocInfo = new GuestDocInfo();
    Foreigner: ForeignerInfo = new ForeignerInfo();
}
