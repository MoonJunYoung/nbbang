import json
from backend.domain.payment import Payment
from backend.repository.connector import MysqlCRUDTemplate, MysqlSession
from backend.repository.model import PaymentModel


def _json_encoding_attend_member_ids(attend_member_ids):
    encode_data = json.dumps(attend_member_ids)
    return encode_data


def _json_decoding_attend_member_ids(attend_member_ids):
    decode_data = json.loads(attend_member_ids)
    return decode_data


class PaymentRepository:
    class Create(MysqlCRUDTemplate):
        def __init__(self, payment: Payment) -> None:
            self.payment = payment
            super().__init__()

        def execute(self):
            payment_model = PaymentModel(
                id=None,
                place=self.payment.place,
                price=self.payment.price,
                pay_member_id=self.payment.pay_member_id,
                attend_member_ids=_json_encoding_attend_member_ids(self.payment.attend_member_ids),
                meeting_id=self.payment.meeting_id,
            )
            self.session.add(payment_model)
            self.session.commit()
            self.payment.id = payment_model.id

    class Update(MysqlCRUDTemplate):
        def __init__(self, payment: Payment) -> None:
            self.payment = payment
            super().__init__()

        def execute(self):
            payment_model = self.session.query(PaymentModel).filter(PaymentModel.id == self.payment.id).first()
            payment_model.place = self.payment.place
            payment_model.price = self.payment.price
            payment_model.pay_member_id = self.payment.pay_member_id
            payment_model.attend_member_ids = _json_encoding_attend_member_ids(self.payment.attend_member_ids)
            self.session.commit()

    class Delete(MysqlCRUDTemplate):
        def __init__(self, payment: Payment) -> None:
            self.payment = payment
            super().__init__()

        def execute(self):
            payment_model = self.session.query(PaymentModel).filter(PaymentModel.id == self.payment.id).first()
            self.session.delete(payment_model)
            self.session.commit()

    class ReadByMeetingID(MysqlCRUDTemplate):
        def __init__(self, meeting_id) -> None:
            self.meeting_id = meeting_id
            super().__init__()

        def execute(self):
            payments = list()
            payment_models: list[PaymentModel] = (
                self.session.query(PaymentModel).filter(PaymentModel.meeting_id == self.meeting_id).all()
            )
            for payment_model in payment_models:
                payment = Payment(
                    id=payment_model.id,
                    place=payment_model.place,
                    price=payment_model.price,
                    pay_member_id=payment_model.pay_member_id,
                    attend_member_ids=_json_decoding_attend_member_ids(payment_model.attend_member_ids),
                    meeting_id=payment_model.meeting_id,
                )
                payments.append(payment)

            return payments
