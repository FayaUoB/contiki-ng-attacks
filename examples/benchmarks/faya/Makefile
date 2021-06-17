CONTIKI_PROJECT = node
all: $(CONTIKI_PROJECT)

PLATFORMS_EXCLUDE = sky z1 nrf52dk native simplelink
BOARDS_EXCLUDE = srf06/cc13x0 launchpad/cc1310 launchpad/cc1350 sensortag/cc2650 sensortag/cc1350

MODULES_REL += ../testbeds

CONTIKI = ../../..

include $(CONTIKI)/Makefile.dir-variables
MODULES += $(CONTIKI_NG_SERVICES_DIR)/deployment
MODULES += $(CONTIKI_NG_SERVICES_DIR)/simple-energest

MAKE_MAC = MAKE_MAC_TSCH
MODULES += $(CONTIKI_NG_SERVICES_DIR)/orchestra


include $(CONTIKI)/Makefile.include