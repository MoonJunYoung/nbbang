import json
from backend.domain.payment import Payment
from backend.repository.connector import MysqlSession
from backend.repository.model import PaymentModel


class PaymentRepository(MysqlSession):
    def json_encoding_attend_member_ids(self, attend_member_ids):
        encode_data = json.dumps(attend_member_ids)
        return encode_data

    def json_decoding_attend_member_ids(self, attend_member_ids):
        decode_data = json.loads(attend_member_ids)
        return decode_data

    def create(self, payment: Payment):
        payment_model = PaymentModel(
            id=None,
            place=payment.place,
            price=payment.price,
            attend_member_ids=self.json_encoding_attend_member_ids(payment.attend_member_ids),
            meeting_id=payment.meeting_id,
        )
        self.session.add(payment_model)
        self.session.commit()
        payment.id = payment_model.id
        self.colse()

    def update(self, payment: Payment):
        payment_model = self.session.query(PaymentModel).filter(PaymentModel.id == payment.id).first()
        payment_model.place = payment.place
        payment_model.price = payment.price
        payment_model.attend_member_ids = self.json_encoding_attend_member_ids(payment.attend_member_ids)
        self.session.commit()
        self.colse()

    def delete(self, payment: Payment):
        payment_model = self.session.query(PaymentModel).filter(PaymentModel.id == payment.id).first()
        self.session.delete(payment_model)
        self.session.commit()
        self.colse()

    def read_payments_by_meeting_id(self, meeting_id):
        payments = list()
        payment_models: list[PaymentModel] = (
            self.session.query(PaymentModel).filter(PaymentModel.meeting_id == meeting_id).all()
        )
        self.colse()

        for payment_model in payment_models:
            payment = Payment(
                id=payment_model.id,
                place=payment_model.place,
                price=payment_model.price,
                attend_member_ids=self.json_decoding_attend_member_ids(payment_model.attend_member_ids),
                meeting_id=payment_model.meeting_id,
            )
            payments.append(payment)
        return payments
