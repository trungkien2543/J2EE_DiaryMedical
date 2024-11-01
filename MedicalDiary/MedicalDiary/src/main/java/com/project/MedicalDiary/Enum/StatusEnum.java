package com.project.MedicalDiary.Enum;

public enum StatusEnum {
    DELETE(-2),
    CANCEL(-1),
    PENDING(0),
    ACCEPTED(1);

    private final int code;

    StatusEnum(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static StatusEnum fromCode(int code) {
        for (StatusEnum status : StatusEnum.values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        throw new IllegalArgumentException("Invalid Status code: " + code);
    }
}

