class IdentifierAlreadyException(Exception):
    def __init__(self, identifier) -> None:
        super().__init__(f"{identifier} is already.")
