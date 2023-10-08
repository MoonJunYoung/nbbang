class IdentifierAlreadyException(Exception):
    def __init__(self, identifier) -> None:
        super().__init__(f"{identifier} is already.")


class IdentifierNotFoundException(Exception):
    def __init__(self, identifier) -> None:
        super().__init__(f"{identifier} is not found.")


class PasswordNotMatchException(Exception):
    def __init__(self, identifier, password) -> None:
        super().__init__(f"{password} is not match to {identifier}.")


class EmptyValueException(Exception):
    def __init__(self, value) -> None:
        super().__init__(f"{value} is empty")


class InvalidTokenException(Exception):
    def __init__(self) -> None:
        super().__init__(f"invalid authorization token")
