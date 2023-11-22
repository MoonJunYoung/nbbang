from backend.domain.member import Member
from backend.domain.payment import Payment
from backend.domain.share import Share


def set_DTO(DTO, domains):
    if hasattr(domains, "__iter__"):
        result = list()
        for domain in domains:
            result.append(DTO(domain))
    else:
        result = DTO(domains)
    return result


class MemberDTO:
    def __init__(self, member: Member) -> None:
        self.id = member.id
        self.name = member.name
        self.leader = member.leader
        self.amount = member.amount


class ShareMemberDTO(MemberDTO):
    def __init__(self, member: Member) -> None:
        self.kakao_deposit_link = getattr(member, "kakao_deposit_link", None)
        self.toss_deposit_link = getattr(member, "toss_deposit_link", None)
        super().__init__(member)


class PaymentDTO:
    def __init__(self, payment: Payment) -> None:
        self.id = payment.id
        self.place = payment.place
        self.price = payment.price
        self.split_price = payment.split_price
        self.pay_member = payment.pay_member
        self.attend_member = payment.attend_member
        self.attend_member_ids = payment.attend_member_ids


class ShareDTO:
    def __init__(self, share: Share) -> None:
        self.meeting = share.meeting
        self.members = set_DTO(ShareMemberDTO, share.calcaulte.members)
        self.payments = set_DTO(PaymentDTO, share.calcaulte.payments)
