package com.rocket.ssafast.workspace.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rocket.ssafast.figma.dto.response.ResFigmaTokenDto;
import com.rocket.ssafast.workspace.domain.Baseurl;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DetailWorkspaceDto {
    private Long id;
    private String figmaUrl;
    private String name;
    private String favicon;
    private String description;
    private int totalApiCount;
    private int completeApiCount;
    private String figmaImg;
    @JsonFormat(pattern = "yyyy-MM-DD")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-DD")
    private Date endDate;
    private String figmaFileId;
    private String figmaFileName;
    private List<String> baseurls;

    private ResFigmaTokenDto figmaToken;


}
