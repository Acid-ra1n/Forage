package com.skyscanner;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;

public class Search implements Serializable {
    private static final long serialVersionUID = -6081874209390112463L;
    @JsonProperty
    private String city;

    public String getCity() {
        return "";
    }
}

