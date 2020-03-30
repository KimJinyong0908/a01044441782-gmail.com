console.clear();
HeightSync__nodes = {};

var HeightSync__windowWidth = $(window).width();

function HeightSync__init() {
    // 데이터를 모으는 작업, HeightSync__nodes 변수에 데이터를 채운다.
    $('.height-sync').each(function (index, node) {
        var $node = $(node);
        var groupNos = $node.attr('data-height-sync-group-no');

        groupNos = groupNos.split(',');

        for (var i = 0; i < groupNos.length; i++) {
            var groupNo = groupNos[i];
            if (groupNo.indexOf("up") == -1) {
                groupNo += "_0up";
            }

            if (groupNo.indexOf("down") == -1) {
                groupNo += "_100000down";
            }

            if (typeof HeightSync__nodes[groupNo] == 'undefined') {
                var bits = groupNo.replace('down', '');
                bits = groupNo.replace('up', '');
                bits = groupNo.split('_');
                var minWidth = parseInt(bits[1]);
                var maxWidth = parseInt(bits[2]);

                console.log(groupNo);

                HeightSync__nodes[groupNo] = {
                    minWidth: minWidth,
                    maxWidth: maxWidth,
                    nodes: []
                };
            }

            HeightSync__nodes[groupNo].nodes.push($node);
        }
    });

    $(window).resize(Height_Sync__sync);
    Height_Sync__sync();
}

function Height_Sync__sync() {
    HeightSync__windowWidth = $(window).width();

    $('.height-sync').data('height-sync-group-no', 'N');

    for (var key in HeightSync__nodes) {
        var height = 0;
        var $tallNode = null;
        var tallNodeIndex = -1;

        for (var i = 0; i < HeightSync__nodes[key].nodes.length; i++) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ($node.data('height-sync-group-no') != 'Y') {
                $node.css('height', '');
            }
        }

        if (HeightSync__windowWidth < HeightSync__nodes[key].minWidth || HeightSync__windowWidth > HeightSync__nodes[key].maxWidth) {
            continue;
        }

        for (var i = 0; i < HeightSync__nodes[key].nodes.length; i++) {
            var $node = HeightSync__nodes[key].nodes[i];
            if ($tallNode == null || $tallNode.height() < $node.height()) {
                $tallNode = $node;
                tallNodeIndex = i;
            }
        }

        for (var i = 0; i < HeightSync__nodes[key].nodes.length; i++) {
            var $node = HeightSync__nodes[key].nodes[i];
            if (i != tallNodeIndex) {
                $node.height($tallNode.height());
                $node.data('height-sync-group-no', 'Y');
            }
        }
    }
}

HeightSync__init();