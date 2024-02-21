# Intro
정산어플은 앱스토어에 많이 존재합니다.
앱이라는 특성상 모바일에서만 사용이 가능하며, 모바일 환경에서 정산할때 사용내역 확인을 위하여 카드사 어플를 번갈아가며 확인하면서 결제내역을 추가해야합니다.
매주 지인들과 스터디를 하며 해당 모임에서 총무 역할을 하면서 위와같은 불편함을 느껴 PC에서도 


# Summary
- 모임에서 사용된 금액을 편리하게 정산할 수 있는 웹 서비스 입니다.

- Loosed Coupling과 High Cohesion를 위하여 Domain Driven Design 원칙 따르기
- 사용자에게 서비스 배포를 위한 

# 구현기능
### 계정
- ID, PASSWORD로 로그인
- Google, Kakao, Naver Oauth 로그인

### 모임
- 모임 추가, 수정, 삭제

### 멤버
- 멤버 추가, 수정, 삭제
- 멤버 맞춤 원클릭 송금 링크
> Toss, Kakao의 QR코드 송금 URI를 해석하여 맞춤 개발, 해당 링크 클릭시 총무가 설정한 입금 정보 및 입금 금액이 자동으로 설정됩니다.

### 결제내역
- 결제내역 추가, 수정, 삭제

### 정산
프로젝트의 핵심입니다.
멤버와 결제내역을 기반으로 결제내역
> DDD 원칙상 고유 ID가 존재하지 않은 


### 리팩토링 가능성
- 아직 많은 도메인객체가 setter 메서드를 가지고있습니다.
```
#ex Payment Domain
def set_attend_members_name(self, members: list[Member]):
    self.attend_member = list()
    for member in members:
        for attend_member_id in self.attend_member_ids:
            if member.id == attend_member_id:
                self.attend_member.append(member.name)

def set_pay_member_name(self, members: list[Member]):
    for member in members:
        if member.id == self.pay_member_id:
            self.pay_member = member.name

```
해당 메서드들은 Read 작업만을 위한 메서드임으로 Infrastructure Layer에서 sql join 구문으로 수정하여 분리가 가능할 것 같습니다.

- Calculate 

# Domain Model
![image](https://github.com/moonjunyoung/nbbang/assets/110980148/84e5a650-ec3e-4ccb-a4ba-a01965c29ae4)
# Bounded Context
![image](https://github.com/moonjunyoung/nbbang/assets/110980148/28c5580d-318f-4d75-a741-76fe1186a19e)
# Aggregate
![image](https://github.com/moonjunyoung/nbbang/assets/110980148/ac6a0ea8-069d-4a33-b677-8166a0741d57)